from init import *

# setting generate table otomatis
auto_generate_tables = False


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(60), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    active = db.Column(db.String(1), nullable=False, default='Y')   # Y/N

    def __iter__(self):
        yield 'id', self.id
        yield 'name', self.name
        yield 'password', self.password
        yield 'role', self.role
        yield 'active', self.active
        # TODO ikutin yang di bawah


class LogUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    activity = db.Column(db.String(6), nullable=False)
    log_time = db.Column(db.DateTime, nullable=False)

    user = db.relationship('User', foreign_keys=[user_id])

    def __iter__(self):
        yield 'id', self.id
        yield 'user_id', self.user_id
        yield 'activity', self.activity
        yield 'log_time', self.log_time


class UserKpi(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date = db.Column(db.DateTime, nullable=False)
    total = db.Column(db.Integer)

    user = db.relationship('User', foreign_keys=[user_id])

    def __iter__(self):
        yield 'id', self.id
        yield 'user_id', self.user_id
        yield 'date', self.date
        yield 'total', self.total


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(100))
    city = db.Column(db.String(15))
    zipcode = db.Column(db.String(10))
    province = db.Column(db.String(20))
    country = db.Column(db.String(20))
    phone = db.Column(db.String(20))
    fax = db.Column(db.String(20))
    email = db.Column(db.String(30))
    homepage = db.Column(db.String(40))
    holding = db.Column(db.String(50))
    assoc = db.Column(db.String(30))
    brand = db.Column(db.String(50))
    product = db.Column(db.String(50))
    line_business = db.Column(db.String(50))
    input_time = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    user = db.relationship('User', foreign_keys=[user_id])

    def __iter__(self):
        yield 'id', self.id
        yield 'name', self.name
        yield 'address', self.address
        yield 'city', self.city
        yield 'zipcode', self.zipcode
        yield 'province', self.province
        yield 'country', self.country
        yield 'phone', self.phone
        yield 'fax', self.fax
        yield 'email', self.email
        yield 'homepage', self.homepage
        yield 'holding', self.holding
        yield 'assoc', self.assoc
        yield 'brand', self.brand
        yield 'product', self.product
        yield 'line_business', self.line_business
        yield 'input_time', self.input_time
        yield 'user_id', self.user_id


class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    status = db.Column(db.String(4))
    title = db.Column(db.String(40))
    title_category = db.Column(db.String(35))
    eselon = db.Column(db.Integer)
    mobile_phone = db.Column(db.String(15))
    private_mail = db.Column(db.String(40))
    input_time = db.Column(db.DateTime(timezone=True), default=now())
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    company = db.relationship('Company', foreign_keys=[company_id])
    user = db.relationship('User', foreign_keys=[user_id])

    def __iter__(self):
        yield 'id', self.id
        yield 'name', self.name
        yield 'status', self.status
        yield 'title', self.title
        yield 'title_category', self.title_category
        yield 'eselon', self.eselon
        yield 'mobile_phone', self.mobile_phone
        yield 'private_mail', self.private_mail
        yield 'input_time', self.input_time
        yield 'user_id', self.user_id
        yield 'company_id', self.company_id


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    quota = db.Column(db.Integer, default=0)

    def __iter__(self):
        yield 'id', self.id
        yield 'title', self.title
        yield 'start_date', self.start_date
        yield 'end_date', self.end_date
        yield 'quota', self.quota


class CustomerEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'))

    customer = db.relationship('Customer', foreign_keys=[customer_id])
    event = db.relationship('Event', foreign_keys=[event_id])

    def __iter__(self):
        yield 'id', self.id
        yield 'customer_id', self.customer_id
        yield 'event_id', self.event_id


class SurveyData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    source = db.Column(db.String(30))
    ticket_code = db.Column(db.String(2))
    list_visit_interest = db.Column(db.String(40))
    list_product_interest = db.Column(db.String(40))
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'))

    customer = db.relationship('Customer', foreign_keys=[customer_id])
    event = db.relationship('Event', foreign_keys=[event_id])

    def __iter__(self):
        yield 'id', self.id
        yield 'source', self.source
        yield 'ticket_code', self.ticket_code
        yield 'list_visit_interest', self.list_visit_interest
        yield 'list_product_interest', self.list_product_interest
        yield 'customer_id', self.customer_id
        yield 'event_id', self.event_id


if auto_generate_tables:
    db.create_all()