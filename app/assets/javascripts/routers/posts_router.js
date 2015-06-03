Journal.Routers.PostsRouter = Backbone.Router.extend({
  initialize: function ($el) {
    this.$el = $el;
  },

  routes: {
    '': 'PostsIndex',
    'posts/:id': 'PostShow',
    'posts/:id/edit': 'PostForm'
  },

  PostsIndex: function () {
    var indexView = new Journal.Views.PostsIndex({
      collection: new Journal.Collections.Posts()
    });
    indexView.collection.fetch();
    this._swapView(indexView);
  },

  PostShow: function (id) {
    var showView = new Journal.Views.PostShow({
      model: this._postCollection().getOrFetch(id)
    });
    this._swapView(showView);
  },

  PostForm: function (id) {
    var postForm = new Journal.Views.PostForm({
      model: this._postCollection().getOrFetch(id)
    });
    this._swapView(postForm);
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
