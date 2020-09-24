queries = []
import random
for i in range(1, 1015):
    if i != 329 and i != 328:
        has_male = bool(random.getrandbits(1))
        if not has_male:
            has_female = True
        else:
            has_female = f"{str(bool(random.getrandbits(1)))}"
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
                  f"{str(bool(random.getrandbits(1)))}, "\
                  f"{str(has_male)}, "\
                  f"{str(has_female)})"\
              ";\n"
        queries.append(sql_query)

with open("toilet_features_dump.sql", "w") as out_file:
    for query in queries:
        out_file.write(query)
