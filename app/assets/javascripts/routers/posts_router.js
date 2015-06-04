Journal.Routers.PostsRouter = Backbone.Router.extend({
  initialize: function ($el) {
    this.$el = $el;
    this.PostsIndex();
  },

  routes: {
    '': 'PostsIndex',
    'posts/new': 'NewPost',
    'posts/:id': 'PostShow',
    'posts/:id/edit': 'EditPost'
  },

  EditPost: function (id) {
    var postForm = new Journal.Views.PostForm({
      model: this._postCollection().getOrFetch(id),
      collection: this._postCollection()
    });
    this._swapView(postForm);
  },

  NewPost: function () {
    var newPost = new Journal.Models.Post();
    var newForm = new Journal.Views.PostForm({
      model: newPost,
      collection: this._postCollection()
    })
    this._swapView(newForm);
  },

  PostsIndex: function () {
    var indexView = new Journal.Views.PostsIndex({
      collection: this._postCollection()
    });
    indexView.collection.fetch();
    $('.sidebar').html(indexView.render().$el);
  },

  PostShow: function (id) {
    var showView = new Journal.Views.PostShow({
      model: this._postCollection().getOrFetch(id)
    });
    this._swapView(showView);
  },

  _postCollection: function() {
    if (!this._collection) {
      this._collection = new Journal.Collections.Posts();
    }
    this._collection.fetch();
    return this._collection;
  },

  _swapView: function (newView) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this._currentView = newView;
    this.$el.html(newView.render().$el);
  }

})
