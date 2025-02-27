from django.test import TestCase
from users.models import User


class UserTestCase(TestCase):
    def test_user_creation(self):
        user = User.objects.create_user(username='test', password='testpass123')
        self.assertEqual(user.phone, '')