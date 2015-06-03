Journal.Views.PostsIndexItem = Backbone.View.extend({
  template: JST['posts/index_item'],
  tagName: 'li',
  model: Journal.Models.Post,
  events: {
    'click button': 'deleteIndexItem'
  },

  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  },

  deleteIndexItem: function () {
    this.model.destroy();
    this.remove();
  }
})
