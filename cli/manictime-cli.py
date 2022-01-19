import sys
import datetime
SERVER_LINK = 'https://manictime.lak.nz'
AUTH_TOKEN = "5989585dc24846a6aaf2febe48e37879"
newzealnd = 13
import requests,json

def getNow():
    return datetime.datetime.utcnow()+ datetime.timedelta(hours=newzealnd)

def add_to_manictime(tag,notes,start_time,end_time,duration=0):
    """ duration is in seconds """
    
    headers = {
    'Accept': 'application/vnd.manictime.v2+json',
    'Authorization': f'Bearer {AUTH_TOKEN}',
    }
    response = requests.get(f'{SERVER_LINK}/api/timelines', headers=headers)
    timelines = json.loads(response.text)
    for timeline in timelines['timelines']:
        if timeline['timelineType']['typeName'] =="ManicTime/Tags":
            tags_timeline_id = timeline['timelineId']

    start_time2 = start_time
    if duration == 0 and end_time is None: 
        return print("please either give duration or endtime")
    elif end_time is not None:
        duration = round((end_time - start_time).total_seconds())
    else:
        start_time2 = start_time2 - datetime.timedelta(seconds=int(duration))
    start = f"{start_time2.isoformat()}+{newzealnd}:00"
    post_json = json.dumps({
        "values":{
            "name": tag,
            "notes":notes.strip(),
            "timeInterval": {
                "start": start,
                "duration": duration
            }
        }
    })
    headers1 = {
        'Accept': 'application/vnd.manictime.v3+json',
        'Content-Type': 'application/vnd.manictime.v3+json',
        'Authorization': f'Bearer {AUTH_TOKEN}',
    }
    response = requests.post(url=f'{SERVER_LINK}/api/timelines/{tags_timeline_id}/activities',data=post_json,headers=headers1)
    print(response.text)

def main():
    # print(sys.argv)
    tag = sys.argv[1]
    notes= sys.argv[2]
    duration = sys.argv[3]
    print(getNow())
    add_to_manictime(tag,notes,getNow(),None,duration)

main()