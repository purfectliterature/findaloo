import urllib.request, urllib.error, urllib.parse
import json, random, requests
BASE_URL = "https://toilet.org.sg/"
queries = []


def get_images_url(url):
    response = urllib.request.urlopen(url)
    images_url_result = []
    soup = BeautifulSoup(response.read())
    all_images_element = soup.select("img")
    for image_element in all_images_element:
        image_url = BASE_URL + image_element.get("src")
        images_url_result.append(image_url)
    return images_url_result

url = "https://maps.googleapis.com/maps/api/geocode/json"

from bs4 import BeautifulSoup
toilets = []
soup = BeautifulSoup(open("toilets.html", "r"))
all_tables = soup.select("table")
regions = ["Central", "North East", "North West", "South East", "South West"]
i = 1
for table in all_tables:
    all_rows = table.select("tbody")[0].select("tr")
    for row in all_rows:
        all_columns = row.select("td")
        link_images = all_columns[1].select("a")
        if link_images:
            name = link_images[0].contents[-1].strip()
            url_to_image_page = link_images[0].get("href")
            images_url = get_images_url(url_to_image_page)[6:]
        else:
            name = all_columns[1].contents[0]
            images_url = []
        address = all_columns[2].contents[0]
        stars = len(all_columns[3].select("i"))
        management = 1
        if "Bus " in name:
            management = 2
        if "MRT " in name:
            management = 3
        data = {
                "address": address,
                "key": "AIzaSyDsu6-lcKevLrFPVn1tmFYRdqHY11BEQcI"
            }
        #r = requests.get(url, data)
        #lat = (r.json().get("results")[0].get("geometry").get("location").get(
        #    "lat"))
        #lng = (r.json().get("results")[0].get("geometry").get("location").get(
        #    "lng"))
        lat = 100
        lng = 150
        sql_query = f"INSERT INTO toilets values({i}, {management}, '{name}', '{regions[i-1]}', '{address}', {lat}, {lng}, NULL, {random.randint(1,10)});\n"
        queries.append(sql_query)
        sql_query = f"INSERT INTO toilet_certifications values({i}, 'Restroom Association (Singapore)', {stars});\n"
        queries.append(sql_query)
        sql_query = f"INSERT INTO toilet_features values({i}, "\
            f"{str(bool(random.getrandbits(1)))}, "\
            f"{str(bool(random.getrandbits(1)))}, "\
            f"{str(bool(random.getrandbits(1)))}, "\
            f"{str(bool(random.getrandbits(1)))}, "\
            f"{str(bool(random.getrandbits(1)))}, "\
            f"{str(bool(random.getrandbits(1)))}, "\
            f"{str(bool(random.getrandbits(1)))}, "\
            f"{str(bool(random.getrandbits(1)))}, "\
            f"{str(bool(random.getrandbits(1)))}, "\
            f"{str(bool(random.getrandbits(1)))})"\
        ";\n"
        queries.append(sql_query)
        for image_url in images_url:
            sql_query = f"INSERT INTO toilet_images values({i}, '{image_url}');\n"
            queries.append(sql_query)
        break
    break

    """
    toilets.append({
        "name": name,
        "management": management,
        "region": regions[i],
        "address": address,
        "stars": stars,
        "queue": random.randint(1,10),
        "images_url": images_url
    })
    """
    i += 1

print(queries)
with open("toilets_db.sql", "w") as out_file:
    for query in queries:
        out_file.write(query)

