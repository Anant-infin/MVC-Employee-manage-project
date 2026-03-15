from flask import jsonify

def response(success=False, message=None, data=None, response_code=None):
    return jsonify({
        "success": success,
        "message": message,
        "data": data,
        "response_code": response_code
    })

def conv_to_dict(self):
        return {
            'e_id': self.e_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'contact_no': self.contact_no,
            'address': self.address,
            'updated': self.updated
        }


            
def to_dict(obj):
    if isinstance(obj,dict):
        return {k: to_dict(v) for k, v in obj.items()}
    elif hasattr(obj, '__dict__'):
        return {k: to_dict(v) for k, v in obj.__dict__.items() 
        if not k.startswith('_') and not callable(v)}
    elif isinstance(obj,(set or tuple or list)):
        return {k: to_dict(v) for k, v in enumerate(obj)}
         
