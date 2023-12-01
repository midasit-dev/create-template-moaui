from js import fetch, JSON

def helloWorld():
	return ("Hello World! this message is from def HelloWorld of PythonCode.py")

async def apiGet():
  # Since pyscript does not support HTTPS requests, we use the regular JavaScript fetch.
	response = await fetch('https://moa.rpm.kr-st-midasit.com/backend/plugins/health')
	json_data = await response.json()
	return JSON.stringify(json_data)

async def apiPost(mapiKey):
  # Since pyscript does not support HTTPS requests, we use the regular JavaScript fetch.
  response = await fetch('https://moa.rpm.kr-st-midasit.com/backend/plugins', {
		'method': 'POST',
		'headers': {
			'Content-Type': 'application/json',
			'MAPI-Key': mapiKey
		},
		'body': JSON.stringify({
			'name': 'pyscript',
			'description': 'pyscript test'
		})
	})
  json_data = await response.json()
  return JSON.stringify(json_data)