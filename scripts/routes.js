page('/',
  articlesController.loadAll,
  articlesController.index);

//Not created yet. page('/about', aboutController.index);

page('/article/:id',
  articlesController.loadById,
  articlesController.index);

page('/category', '/');

page('/code', codeController.index);

page('/category/:categoryName',
  articlesController.loadByCategory,
  articlesController.index);

page();
