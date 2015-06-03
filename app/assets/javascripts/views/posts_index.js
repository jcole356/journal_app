Journal.Views.PostsIndex = Backbone.View.extend({
  template: JST['posts/index'],

  initialize: function () {
    this.collection.fetch({ reset: true });
    this.listenTo(this.collection, 'remove reset add', this.render);
  },

  render: function () {
    var content = this.template({ posts: this.collection });
    this.$el.html(content);
    this.collection.models.forEach(function (post) {
      var indexItemView = new Journal.Views.PostsIndexItem({ model: post });
      this.$el.find('ul.posts').append(indexItemView.render().$el);
    }.bind(this));

    return this;
  }
})
