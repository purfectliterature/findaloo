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


# Function that prints
# the required sequence
def split(x, n):
    result = []
    # If we cannot split the
    # number into exactly 'N' parts
    if (x < n):
        return [x]

    # If x % n == 0 then the minimum
    # difference is 0 and all
    # numbers are x / n
    elif (x % n == 0):
        for i in range(n):
            result.append(x // n)
    else:
        # upto n-(x % n) the values
        # will be x / n
        # after that the values
        # will be x / n + 1
        zp = n - (x % n)
        pp = x // n
        for i in range(n):
            if (i >= zp):
                result.append(pp + 1)
            else:
                result.append(pp)
    return result


url = "https://maps.googleapis.com/maps/api/geocode/json"

from bs4 import BeautifulSoup
toilets = []
soup = BeautifulSoup(open("toilets.html", "r"))
all_tables = soup.select("table")
regions = ["Central", "North East", "North West", "South East", "South West"]
toilet_count = 1
building_count = 1
table_count = 1
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
        name = name.replace("'", "''")
        address = all_columns[2].contents[0]
        address = address.replace("'", "''")
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
        sql_query = f"INSERT INTO buildings values({building_count}, '{name}', '{regions[table_count-1]}', '{address}', {lat}, {lng});\n"
        queries.append(sql_query)
        image_count = len(images_url)

        number_of_toilets = (image_count // 4) if image_count > 0 else 1
        if number_of_toilets < 7:
            levels_of_toilets = random.sample(range(1, 7), number_of_toilets)
        else:
            levels_of_toilets = random.sample(range(1, number_of_toilets + 1), number_of_toilets)

        images_splitting_among_toilets = split(image_count, number_of_toilets)

        for i in range(number_of_toilets):
            toilet_name = f"{name}, L{levels_of_toilets[i]}"
            sql_query = f"INSERT INTO toilets values({toilet_count}, {building_count}, {management}, '{toilet_name}', {random.randint(1,10)});\n"
            queries.append(sql_query)
            sql_query = f"INSERT INTO toilet_certifications values({toilet_count}, 1, {stars});\n"
            queries.append(sql_query)
            sql_query = f"INSERT INTO toilet_features values({toilet_count}, "\
                f"{str(bool(random.getrandbits(1)))}, "\
                f"{str(bool(random.getrandbits(1)))}, "\
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
            begin_index = sum(images_splitting_among_toilets[0:i])
            end_index = sum(images_splitting_among_toilets[0: i + 1])
            for image_url in images_url[begin_index:end_index]:
                sql_query = f"INSERT INTO toilet_images values({toilet_count}, '{image_url}');\n"
                queries.append(sql_query)
            toilet_count += 1

        building_count += 1
    table_count += 1

with open("toilets_db2.sql", "w") as out_file:
    for query in queries:
        out_file.write(query)
