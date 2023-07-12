from django.urls import path, include
from rest_framework import routers, permissions
from rest_framework.documentation import include_docs_urls
from customers import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = routers.DefaultRouter()
router.register(r'customers', views.CustomerView, 'Customers')

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('api/', include(router.urls)),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0)),
    path('docs/', include_docs_urls(title='API Documentation')),
]
