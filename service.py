from model import *


def get_user():
    user = User.query.all()

    return _serialize_list_obj(user)


def drop_company(company_id):
    cc = Company.query.filter(Company.id == company_id).first()
    dbs.delete(cc)
    dbs.commit()


def save_company(company):
    company = _dict_to_object(company, Company)

    if company.id is None:
        dbs.add(company)
        dbs.commit()
    else:
        current_id = company.id
        cc = Company.query.filter(Company.id == current_id).first()
        cc.name = company.name
        cc.address = company.address
        cc.city = company.city
        cc.zipcode = company.zipcode
        cc.province = company.province
        cc.country = company.country
        cc.phone = company.phone
        cc.fax = company.fax
        cc.email = company.email
        cc.homepage = company.homepage
        cc.holding = company.holding
        cc.assoc = company.assoc
        cc.brand = company.brand
        cc.product = company.product
        cc.line_business = company.line_business
        cc.input_time = now()
        dbs.commit()


def get_company():
    company = Company.query.all()

    return _serialize_list_obj(company)


def get_event():
    event = Event.query.all()

    return _serialize_list_obj(event)


def drop_customer(customer_id):
    cc = Customer.query.filter(Customer.id == customer_id).first()
    dbs.delete(cc)
    dbs.commit()


def save_customer(customer):
    customer = _dict_to_object(customer, Customer)

    if customer.id is None:
        customer.input_time = now()

        company = Company.query.filter(Company.id == customer.company_id).first()
        customer.company = company

        dbs.add(customer)
        dbs.commit()

        # update kpi
        user_id = customer.user_id
        current_kpi = UserKpi.query.filter(UserKpi.date == now()).filter(UserKpi.user_id == user_id).first()
        if current_kpi is None:
            current_kpi = UserKpi()
            current_kpi.user_id = user_id
            current_kpi.date = now()
            current_kpi.total = 1
            dbs.add(current_kpi)
            dbs.commit()
        else:
            current_kpi.total = current_kpi.total + 1
            dbs.commit()

    else:
        current_id = customer.id
        cc = Customer.query.filter(Customer.id == current_id).first()
        cc.name = customer.name
        cc.status = customer.status
        cc.title = customer.title
        cc.title_category = customer.title_category
        cc.eselon = customer.eselon
        cc.mobile_phone = customer.mobile_phone
        cc.private_mail = customer.private_mail
        cc.company_id = customer.company_id
        dbs.commit()


def get_customer():
    customer = Customer.query.all()

    return _serialize_list_obj(customer)


def add_event_to_customer(customer_id, event_id, survey_data):

    current_event = CustomerEvent.query.filter(CustomerEvent.customer_id == customer_id)\
        .filter(CustomerEvent.event_id == event_id).first()

    if current_event is None:
        customer_event = CustomerEvent()
        customer_event.customer_id = customer_id
        customer_event.event_id = event_id
        dbs.add(customer_event)
        dbs.commit()

    survey_data = _dict_to_object(survey_data, SurveyData)
    current_survey = SurveyData.query.filter(SurveyData.customer_id == customer_id)\
        .filter(SurveyData.event_id == event_id).first()
    if current_survey is None:
        dbs.add(survey_data)
        dbs.commit()
    else:
        current_survey.source = survey_data.source
        current_survey.ticket_code = survey_data.ticket_code
        current_survey.list_visit_interest = survey_data.list_visit_interest
        current_survey.list_product_interest = survey_data.list_product_interest
        dbs.commit()










def check_credential(username, password):

    user = User.query.filter(User.name == username).filter(User.password == password).first()

    if user is None:
        return None
    else:
        return user


def _dict_to_object(_dict, _class):
    obj = _class()

    for key, val in obj:
        if key in _dict:
            setattr(obj, key, _dict[key])

    return obj


def _serialize_list_obj(_list):
    i = 0
    for obj in _list:
        _list[i] = dict(obj)
        i += 1

    return _list


