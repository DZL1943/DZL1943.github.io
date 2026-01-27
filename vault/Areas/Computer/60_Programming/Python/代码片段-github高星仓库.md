
```python
import csv
from itertools import chain
import json
import time
import httpx


def getData(q='stars%3A>10000', page=1):
    # https://docs.github.com/cn/rest/search#search-repositories
    baseurl = 'https://api.github.com/search/repositories?q={q}&sort=stars&order=desc&per_page=100&page={page}'

    url = baseurl.format(**{'q': q, 'page': page})
    print(url)
    r = httpx.get(url)
    r.raise_for_status()
    return r.json()['items']


def getDataByStars(stars_min=10000, page_max=None):
    datas = []
    page = 1
    while True:
        try:
            data = getData(f'stars%3A>{stars_min}', page)
        except Exception as e:
            print(e)
            break
        datas.extend(data)
        if (data and data[-1]['stargazers_count'] <= stars_min) or (page_max and page >= page_max):
            break
        page += 1
        # if page % 10 == 0:
        #     print('wait for 60s ...')
        #     time.sleep(60)
    return datas


def getDataByLanguages(languages=['python', 'javascript', 'java', 'rust']):
    datas = {}
    for language in languages:
        try:
            data = getData(q=f'language%3A{language}+stars%3A>5000')
            saveJson(data, language)
        except Exception as e:
            print(e)
            break
        datas[language] = handleData(data)
    return datas


def handleData(data):
    fieldmap = {
        'full_name': 'full_name',
        'description': 'description',
        'url': 'html_url',
        'created_at': 'created_at',
        'updated_at': 'updated_at',
        'stars': 'stargazers_count',
        'forks': 'forks_count',
        'issues': 'open_issues_count',
        'language': 'language',
    }

    newdata = []
    for d in data:
        newdata.append({key: d[fieldmap[key]] for key in fieldmap.keys()})

    return newdata


def saveJson(data, name='data', pth='./output'):
    with open(f'{pth}/{name}.json', 'w') as f:
        json.dump(data, f)


def saveCSV(data, name='data', pth='./output'):
    if isinstance(data, dict):
        data = list(chain.from_iterable(data.values()))
    with open(f'{pth}/{name}.csv', 'w') as f:
        writer = csv.DictWriter(f, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)


def test():
    # datas = getDataByLanguages(['python'])
    # saveCSV(datas, 'byLanguage')

    datas = getDataByStars(10000, 10)
    saveJson(datas, 'byStars')
    datas = handleData(datas)
    saveCSV(datas, 'byStars')


if __name__ == '__main__':
    test()
```