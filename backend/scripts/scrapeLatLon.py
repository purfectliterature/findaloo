file1 = open('toilets_dump.sql', 'r')
Lines = file1.readlines()

result = []
# Strips the newline character
for line in Lines:
    if "INTO buildings values" in line:
        splitted_line = (line.split(','))
        lat = splitted_line[-2].strip()
        lon = splitted_line[-1].strip()[:-2]
        location = [float(lat), float(lon)]
        result.append(location)

print(result)

