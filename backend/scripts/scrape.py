import urllib.request, urllib.error, urllib.parse
import json
BASE_URL = 'http://toilet.org.sg/'


def get_images_url(url):
    response = urllib.request.urlopen(url)
    images_url_result = []
    soup = BeautifulSoup(response.read())
    all_images_element = soup.select('img')
    for image_element in all_images_element:
        image_url = BASE_URL + image_element.get('src')
        images_url_result.append(image_url)
    return images_url_result


from bs4 import BeautifulSoup
toilets = []
soup = BeautifulSoup(open("toilets.html", "r"))
all_tables = soup.select("table")
regions = ["Central", "North East", "North West", "South East", "South West"]
i = 0
for table in all_tables:
    all_rows = table.select('tbody')[0].select('tr')
    for row in all_rows:
        all_columns = row.select('td')
        link_images = all_columns[1].select('a')
        if link_images:

            name = link_images[0].contents[-1].strip()
            url_to_image_page = link_images[0].get('href')
            images_url = get_images_url(url_to_image_page)
        else:
            name = all_columns[1].contents[0]
            images_url = []
        address = all_columns[2].contents[0]
        stars = len(all_columns[3].select('i'))
        toilets.append({
            'name': name,
            'region': regions[i],
            'address': address,
            'stars': stars,
            'images_url': images_url
        })
    i += 1

print(json.dumps(
        toilets,
        indent=4,
    ))
