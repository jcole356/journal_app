Journal.Views.PostShow = Backbone.View.extend({
  template: JST['posts/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    "click button.delete": "removePost"
  },

  model: Journal.Models.Post,

  removePost: function () {
    this.model.destroy();
    this.remove();
    Backbone.history.navigate("", { trigger:true });
  },

  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  }
})
