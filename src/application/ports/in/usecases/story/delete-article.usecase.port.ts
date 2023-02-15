export interface DeleteArticleUseCasePort {
  deleteArticle(id: string): Promise<void>;
}
