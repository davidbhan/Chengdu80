from django_elasticsearch_dsl_drf.serializers import DocumentSerializer

from papers.documents import PaperDocument

class PaperDocumentSerializer(DocumentSerializer):
    class Meta:
        document = PaperDocument
        fields = (
            'id',
            'displayName',
            'description'
        )