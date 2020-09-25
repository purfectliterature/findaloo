file1 = open('2_toilets_dump.sql', 'r')
Lines = file1.readlines()

file2 = open('3_toilet_features_dump.sql', 'r')
Lines2 = file2.readlines()

finalLines = []
for line in Lines:
    if "INSERT INTO toilet_features values(" in line:
        for line2 in Lines2:
            if line.split(',')[0] == line2.split(',')[0]:
                finalLines.append(line2)
    else:
        finalLines.append(line)


with open("toilets_db3.sql", "w") as out_file:
    for query in finalLines:
        out_file.write(query)
