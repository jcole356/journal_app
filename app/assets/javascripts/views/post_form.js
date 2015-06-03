Journal.Views.PostForm = Backbone.View.extend({
  template: JST['posts/form'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  model: Journal.Models.Post,

  events: {
    "submit form": "handleSubmit"
  },

  handleSubmit: function (event) {
    event.preventDefault();
    console.log(event.currentTarget);
    var params = $(event.currentTarget).serializeJSON();
    console.log(params);
  },

  render: function () {
    var content = this.template({ post: this.model });

    this.$el.html(content);
    return this;
  }


})
