"""Synthetic supply-chain dataset. Names/figures are invented for demonstrations."""
from datetime import date, timedelta

def build_dataset(today=None):
    today = today or date.today()
    suppliers = [
        {'name':'Demo Taiwan Micro-Semi','region':'Hsinchu, Taiwan','category':'Microcontrollers','status':'Critical','score':'42%','leadTime':'+18 days','safetyStock':'14 days','backup':'Demo Hanoi Assembly'},
        {'name':'Demo Suez Freight','region':'Port Said, Egypt','category':'Maritime Carrier','status':'Critical','score':'35%','leadTime':'+12 days','safetyStock':'5 days','backup':'Demo Cape Logistics'},
        {'name':'Demo Rhine Chemicals','region':'Ludwigshafen, Germany','category':'Chemical Solvents','status':'Warning','score':'74%','leadTime':'+4 days','safetyStock':'22 days','backup':'Demo Texas Materials'},
        {'name':'Demo Kyoto Glass','region':'Kyoto, Japan','category':'Substrates','status':'Stable','score':'96%','leadTime':'Normal','safetyStock':'30 days','backup':'Demo Kyushu Plant'},
        {'name':'Demo Rotterdam Handling','region':'Rotterdam, Netherlands','category':'Harbor Loading','status':'Stable','score':'98%','leadTime':'Normal','safetyStock':'45 days','backup':'Demo Antwerp Handling'},
    ]
    lanes = [
        ('Meridian','Demo Ocean Lines','Suez to Rotterdam','Microcontrollers',12,True,'Port congestion','180000'),
        ('Aurora','Demo Pacific Freight','Shanghai to Los Angeles','Battery components',8,True,'Terminal labor disruption','96000'),
        ('Horizon','Demo Canal Cargo','Panama to New York','Automotive steel',5,False,'','0'),
        ('Cedar','Demo East Asia Lines','Yokohama to Seattle','Precision tooling',9,False,'','0'),
        ('Atlas','Demo Indo-Europe Freight','Mumbai to Rotterdam','Chemical solvents',14,False,'','0'),
        ('Orion','Demo Atlantic Freight','Hamburg to Houston','Glass substrates',7,False,'','0'),
    ]
    shipments, delays = [], []
    for i, (vessel, carrier, route, cargo, days, delayed, reason, cost) in enumerate(lanes):
        record = {'id':f'DEMO-{1001+i}', 'vessel':f'Demo {vessel}', 'carrier':carrier, 'route':route, 'cargo':cargo,
                  'eta':(today+timedelta(days=days)).isoformat(), 'status':'Delayed' if delayed else 'Transit', 'delay':f'+{days} Days' if delayed else 'None'}
        shipments.append(record)
        if delayed:
            delays.append({**record,'cost':f'${int(cost):,}','delay':reason,'risk':'High'})
    backups = [{'target':s['name'],'backup':s['backup'],'region':region,'reliability':reliability,'premium':premium,'onboarding':'Ready','active':False}
               for s,region,reliability,premium in [(suppliers[0],'Hanoi, Vietnam','92%','1.12x Cost'),(suppliers[1],'Cape Town, South Africa','89%','1.35x Cost'),(suppliers[2],'Texas, USA','94%','1.08x Cost')]]
    suggestions = [
        {'component':'Microcontrollers','current':'14 Days','recommended':'45 Days','adjustment':'+31 Days','cost':'+$24k Buffer Fee','status':'Depleted','approved':False},
        {'component':'Battery electrolyte','current':'22 Days','recommended':'35 Days','adjustment':'+13 Days','cost':'+$12k Buffer Fee','status':'Depleted','approved':False},
        {'component':'Glass substrates','current':'30 Days','recommended':'30 Days','adjustment':'0 Days','cost':'No change','status':'Optimal','approved':False},
    ]
    hotspots = [
        {'id':'suez','name':'Suez Canal Corridor','status':'WARN','details':'Demo scenario: vessel congestion adds an estimated 12 days.','coords':{'x':55,'y':38},'traffic':'32 demo vessels/hr','risk':'High'},
        {'id':'shanghai','name':'Shanghai Terminal Complex','status':'STABLE','details':'Demo scenario: normal berth operations.','coords':{'x':78,'y':40},'traffic':'64 demo vessels/hr','risk':'Low'},
        {'id':'la','name':'Los Angeles Terminal','status':'CRITICAL','details':'Demo scenario: terminal labor disruption delays cargo.','coords':{'x':20,'y':35},'traffic':'8 demo vessels/hr','risk':'Critical'},
        {'id':'panama','name':'Panama Canal Transit','status':'STABLE','details':'Demo scenario: normal booking capacity.','coords':{'x':32,'y':52},'traffic':'18 demo vessels/hr','risk':'Low'},
    ]
    insights = [{'name':s['name'],'category':s['category'],'material':s['category'],'exposure':'High' if s['status']=='Critical' else 'Low',
                 'safetyStock':int(s['safetyStock'].split()[0]),'alternativeSource':s['backup'],'status':'Bottlenecked' if s['status']=='Critical' else 'Active'} for s in suppliers]
    trends=[]
    for offset, risk in zip(range(5,-1,-1),[28,34,42,64,50,38]):
        index=today.year*12+today.month-1-offset
        trends.append({'month':date(index//12,index%12+1,1).strftime('%b %Y'),'baseline':30,'current':risk})
    return {'mode':'demo','notice':'Synthetic demo data stored in AWS. Changes persist but do not affect real carriers, purchases or inventory.',
            'seededAt':today.isoformat(),'updatedAt':today.isoformat(),'shipments':shipments,'delays':delays,'suppliers':suppliers,
            'backups':backups,'suggestions':suggestions,'trendData':trends,'criticalHotspots':hotspots,'supplierInsights':insights,'playbooks':[]}
