# import requests
# from pprint import pprint


# def client():
#     credentials = {
#         'username': 'yusuf',
#         'password': '123123'
#     }

#     response = requests.post(
#         url = 'http://127.0.0.1:8000/dj-rest-auth',
#         data = credentials
#     )

#     print('status code: ' , response.status_code)

#     response_data = response.json()
#     pprint(response_data)

# if __name__ == '__main__':
#     client()