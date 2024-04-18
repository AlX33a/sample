import molotov
import random
import asyncio

API_URL = "http://188.225.78.8:81/api/contact?email=test%40example.com&username=test"
BASE_URL = "http://188.225.78.8"

requests_count = 0
errors_count = 0

@molotov.scenario(weight=50)
async def scenario_one(session):
    global requests_count, errors_count
    await asyncio.sleep(random.uniform(0.5, 2))
    async with session.get(BASE_URL) as resp:
        requests_count += 1
        if resp.status != 200:
            errors_count += 1

@molotov.scenario(weight=50)
async def scenario_two(session):
    global requests_count, errors_count
    await asyncio.sleep(random.uniform(0.5, 2))
    async with session.post(API_URL) as resp:
        requests_count += 1
        if resp.status != 200:
            errors_count += 1

if __name__ == 'main':
    molotovsprint = 10000
    molotov.main(sprints=molotovsprint)

    # Create report
    with open("report.txt", "w") as report_file:
        report_file.write(f"Total requests: {requests_count}\n")
        report_file.write(f"Total errors: {errors_count}\n")
