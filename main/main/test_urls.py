"""
Test file for admin urls.
"""

import unittest
from django.test import Client


class MainUrlsTest(unittest.TestCase):
    """Class for test main urls responses."""
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_admin_redirect(self):
        # Issue a GET request admin.
        response_admin = self.client.get("/admin/")

        # Check that the response is 302 Found.
        self.assertEqual(response_admin.status_code, 302)
