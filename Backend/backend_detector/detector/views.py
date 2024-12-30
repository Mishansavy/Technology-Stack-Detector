# import requests
# from bs4 import BeautifulSoup
# from rest_framework.decorators import api_view
# from rest_framework.response import Response


# def detect_technologies(url):
#     try:
#         response = requests.get(url, timeout=10)
#         headers = response.headers
#         backend_tech = []

#         # Analyze headers for backend technologies
#         if "server" in headers:
#             backend_tech.append(f"Server: {headers['server']}")
#         if "x-powered-by" in headers:
#             backend_tech.append(f"Powered by: {headers['x-powered-by']}")

#         # Use BeautifulSoup for meta analysis
#         soup = BeautifulSoup(response.text, 'html.parser')
#         meta_generator = soup.find("meta", attrs={"name": "generator"})
#         if meta_generator and meta_generator.get("content"):
#             backend_tech.append(f"Generator: {meta_generator['content']}")

#         return {"backend_technologies": backend_tech}
#     except Exception as e:
#         return {"error": str(e)}

# @api_view(['POST'])
# def analyze_website(request):
#     url = request.data.get('url')
#     if not url:
#         return Response({"error": "URL is required."}, status=400)
#     if not url.startswith("http"):
#         url = "http://" + url

#     result = detect_technologies(url)
#     return Response(result)

import requests
from bs4 import BeautifulSoup
from rest_framework.decorators import api_view
from rest_framework.response import Response

def detect_technologies(url):
    try:
        response = requests.get(url, timeout=10)
        headers = response.headers
        backend_tech = []
        frontend_tech = []

        # Analyze headers for backend technologies
        if "server" in headers:
            backend_tech.append(f"Server: {headers['server']}")
        if "x-powered-by" in headers:
            backend_tech.append(f"Powered by: {headers['x-powered-by']}")

        # Use BeautifulSoup for meta and script analysis
        soup = BeautifulSoup(response.text, 'html.parser')

        # Detect meta generator tags (commonly used in CMS like WordPress, Joomla)
        meta_generator = soup.find("meta", attrs={"name": "generator"})
        if meta_generator and meta_generator.get("content"):
            backend_tech.append(f"Generator: {meta_generator['content']}")

        # Detect JavaScript libraries/frameworks
        scripts = soup.find_all("script", src=True)
        for script in scripts:
            src = script["src"]
            if "jquery" in src.lower():
                frontend_tech.append("jQuery")
            if "react" in src.lower():
                frontend_tech.append("React")
            if "angular" in src.lower():
                frontend_tech.append("Angular")
            if "vue" in src.lower():
                frontend_tech.append("Vue.js")

        # Detect CSS frameworks (Bootstrap, Tailwind)
        links = soup.find_all("link", href=True)
        for link in links:
            href = link["href"]
            if "bootstrap" in href.lower():
                frontend_tech.append("Bootstrap")
            if "tailwind" in href.lower():
                frontend_tech.append("Tailwind CSS")

        # Remove duplicates and sort technologies
        backend_tech = list(set(backend_tech))
        frontend_tech = list(set(frontend_tech))

        return {
            "backend_technologies": backend_tech,
            "frontend_technologies": frontend_tech,
        }

    except Exception as e:
        return {"error": str(e)}

@api_view(['POST'])
def analyze_website(request):
    url = request.data.get('url')
    if not url:
        return Response({"error": "URL is required."}, status=400)
    if not url.startswith("http"):
        url = "http://" + url

    result = detect_technologies(url)
    return Response(result)
