Journal.Views.PostShow = Backbone.View.extend({
  template: JST['posts/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  model: Journal.Models.Post,

  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  }
})
