"""Backend tests for Vishesh & Veeraja Wedding API."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://vishveeraja-wedding.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- health ----------
class TestHealth:
    def test_root(self, api):
        r = api.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert data.get("date") == "2026-05-08"


# ---------- rsvp create ----------
class TestRSVPCreate:
    def test_create_valid_attending(self, api):
        payload = {
            "guest_name": "TEST_Attend_Guest",
            "side": "groom",
            "event_id": "haldi-groom",
            "event_name": "Haldi",
            "status": "attending",
        }
        r = api.post(f"{API}/rsvp", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str)
        assert data["guest_name"] == "TEST_Attend_Guest"
        assert data["side"] == "groom"
        assert data["status"] == "attending"
        assert "created_at" in data
        # ISO format (contains 'T')
        assert "T" in data["created_at"]

    def test_create_valid_not_attending(self, api):
        payload = {
            "guest_name": "TEST_Decline_Guest",
            "side": "bride",
            "event_id": "marriage-bride",
            "event_name": "Marriage",
            "status": "not_attending",
        }
        r = api.post(f"{API}/rsvp", json=payload)
        assert r.status_code == 200, r.text
        assert r.json()["status"] == "not_attending"

    def test_invalid_status_422(self, api):
        payload = {
            "guest_name": "TEST_Bad",
            "side": "groom",
            "event_id": "haldi-groom",
            "event_name": "Haldi",
            "status": "maybe",
        }
        r = api.post(f"{API}/rsvp", json=payload)
        assert r.status_code == 422

    def test_invalid_side_422(self, api):
        payload = {
            "guest_name": "TEST_Bad2",
            "side": "friend",
            "event_id": "haldi-groom",
            "event_name": "Haldi",
            "status": "attending",
        }
        r = api.post(f"{API}/rsvp", json=payload)
        assert r.status_code == 422

    def test_missing_required_422(self, api):
        r = api.post(f"{API}/rsvp", json={"guest_name": "x"})
        assert r.status_code == 422


# ---------- rsvp list & summary ----------
class TestRSVPListAndSummary:
    def test_list_has_no_mongo_id(self, api):
        # ensure at least one doc
        api.post(f"{API}/rsvp", json={
            "guest_name": "TEST_ListCheck",
            "side": "groom",
            "event_id": "haldi-groom",
            "event_name": "Haldi",
            "status": "attending",
        })
        r = api.get(f"{API}/rsvp")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert len(items) > 0
        for it in items:
            assert "_id" not in it
            assert "id" in it

    def test_list_filter_by_side(self, api):
        r = api.get(f"{API}/rsvp", params={"side": "groom"})
        assert r.status_code == 200
        for it in r.json():
            assert it["side"] == "groom"

        r2 = api.get(f"{API}/rsvp", params={"side": "bride"})
        assert r2.status_code == 200
        for it in r2.json():
            assert it["side"] == "bride"

    def test_summary_structure_and_math(self, api):
        r = api.get(f"{API}/rsvp/summary")
        assert r.status_code == 200
        data = r.json()
        assert set(["total", "attending", "not_attending"]).issubset(data.keys())
        assert data["total"] >= data["attending"] + data["not_attending"] or \
               data["total"] == data["attending"] + data["not_attending"]
        # all ints
        assert isinstance(data["total"], int)
        assert isinstance(data["attending"], int)
        assert isinstance(data["not_attending"], int)

    def test_summary_increments_after_attending(self, api):
        before = api.get(f"{API}/rsvp/summary").json()
        api.post(f"{API}/rsvp", json={
            "guest_name": "TEST_Summary_Inc",
            "side": "bride",
            "event_id": "reception-bride",
            "event_name": "Reception",
            "status": "attending",
        })
        after = api.get(f"{API}/rsvp/summary").json()
        assert after["attending"] == before["attending"] + 1
        assert after["total"] == before["total"] + 1
