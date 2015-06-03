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
    var params = $(event.currentTarget).serializeJSON();
    this.model.set(params["post"]);
    this.model.save({}, {
      success: function () {
        Backbone.history.navigate("posts/" + this.model.id, {trigger: true});
        this.collection.add(this.model);
      }.bind(this),
      error: function (model, response) {
        var $errors = this.$el.find('div.errors');
        $errors.empty();
        response.responseJSON.forEach (function(error) {
          $errors.append($('<li>').text(error));
        });
      }.bind(this)
    });
  },

  render: function () {
    var content = this.template({ post: this.model });

    this.$el.html(content);
    return this;
  }


})
