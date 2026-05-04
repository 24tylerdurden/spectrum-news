import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { articleApi, type Article } from '@/lib/api-articles';
import { Plus, Edit, Eye, Trash2, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const AdminPortal = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await articleApi.getArticles({});
      setArticles(data.articles);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">Please login to access the admin portal</p>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Portal</h1>
            <p className="text-muted-foreground">Manage articles and perspectives</p>
          </div>
          <Link to="/admin/articles/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading articles...</p>
          </div>
        ) : articles && articles.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No articles yet</p>
              <Link to="/admin/articles/new" className="mt-4">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Article
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {articles && articles.map((article) => (
              <Card key={article.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                          {article.status}
                        </span>
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex gap-1">
                            {article.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl">{article.topic}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Created: {new Date(article.created_at).toLocaleDateString()}
                      {article.published_at && (
                        <span className="ml-4">
                          Published: {new Date(article.published_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/articles/${article.slug}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      <Link to={`/admin/articles/${article.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
