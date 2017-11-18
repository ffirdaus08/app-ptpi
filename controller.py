from service import *


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/menu/company')
def company():
    return render_template('company.html')


@app.route('/menu/customer')
def customer():
    return render_template('customer.html')


# API ----------------------------------------------------------------------------

@app.route('/api/login', methods=['POST'])
def api_login():
    username = request.get_json()['username']
    password = request.get_json()['password']

    user = check_credential(username, password)
    if user is None:
        response = EasyResponse()
        response.code = EasyResponse.CODE_UNAUTHORIZED
        response.message = 'Username or password not correct.'

        return response.get_json_response()
    else:
        response = EasyResponse({'user': dict(user)})
        return response.get_json_response()


@app.route('/api/company/drop', methods=['POST'])
def api_drop_company():
    cid = request.get_json().get('company_id')
    drop_company(cid)

    return EasyResponse().get_json_response()


@app.route('/api/company/set', methods=['POST'])
def api_save_company():
    cpn = request.get_json().get('company')
    save_company(cpn)

    return EasyResponse().get_json_response()


@app.route('/api/company/get', methods=['POST'])
def api_get_company():

    comp = get_company()
    response = EasyResponse(comp)

    return response.get_json_response()


@app.route('/api/customer/drop', methods=['POST'])
def api_drop_customer():
    cuid = request.get_json().get('customer_id')
    drop_customer(cuid)

    return EasyResponse().get_json_response()


@app.route('/api/customer/set', methods=['POST'])
def api_save_customer():
    cust = request.get_json().get('customer')
    save_customer(cust)

    return EasyResponse().get_json_response()


@app.route('/api/customer/get', methods=['POST'])
def api_get_customer():

    response = EasyResponse(get_customer())
    return response.get_json_response()


@app.route('/api/event/get', methods=['POST'])
def api_get_event():

    epen = get_event()
    response = EasyResponse(epen)

    return response.get_json_response()


@app.route('/api/event/set', methods=['POST'])
def api_set_event_customer():

    customer_id = request.get_json().get('customer_id')
    event_id = request.get_json().get('event_id')
    survey_data = request.get_json().get('survey_data')
    add_event_to_customer(customer_id, event_id, survey_data)

    response = EasyResponse()
    return response.get_json_response()




















class EasyResponse:

    CODE_ERROR = -1
    CODE_SUCCESS = 0
    CODE_UNAUTHORIZED = 1

    def __init__(self, data=None):
        self.data = data
        self.code = self.CODE_SUCCESS
        self.message = 'success'
        self.status = {}

    def __iter__(self):
        self.status = {'code': self.code, 'message': self.message}
        yield 'data', self.data
        yield 'status', self.status

    def get_json_response(self):
        return Response(json.dumps(dict(self), cls=JsonEncoder), mimetype='application/json')


class JsonEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.strftime('%a, %d %b %Y %H:%M:%S %Z')
        elif isinstance(obj, date):
            return obj.strftime('%Y-%m-%d')

        return json.JSONEncoder.default(self, obj)

