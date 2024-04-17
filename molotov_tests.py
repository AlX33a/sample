# file for load test site
import molotov
import random
import asyncio

API_URL = "http://188.225.78.8:81/api/contact?email=test%40example.com&username=test"
BASE_URL = "http://188.225.78.8"

@molotov.scenario(weight=50)
async def scenario_one(session):
    await asyncio.sleep(random.uniform(0.5, 2))
    async with session.get(BASE_URL) as resp:
        assert resp.status == 200

@molotov.scenario(weight=50)
async def scenario_two(session):
    await asyncio.sleep(random.uniform(0.5, 2))
    async with session.post(API_URL) as resp:
        assert resp.status == 200

if __name__ == '__main__':
    molotovsprint = 10000
    molotov.main(sprints=molotovsprint)