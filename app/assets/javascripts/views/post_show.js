Journal.Views.PostShow = Backbone.View.extend({
  template: JST['posts/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    "click button.delete": "removePost",
    "dblclick span.inline-edit": "inlineEdit",
    "blur form.inline-edit": "updateInlineEdit"
  },

  model: Journal.Models.Post,

  inlineEdit: function (event) {
    var $target, klass;
    if ($(event.currentTarget).attr('class') === 'inline-edit title') {
      $target = this.$el.find('.title');
      klass = 'title';
    } else if ($(event.currentTarget).attr('class') === 'inline-edit body') {
      $target = this.$el.find('.body');
      klass = 'body';
    }
    var oldText = $target.text();
    var html = "<form class='inline-edit'><input type='text'" +
                " name='post[" + klass + "]'" +
                "value='" + oldText + "'></form>"
    $target.html(html);
  },

  updateInlineEdit: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    this.model.save(params['post'], {
      error: function (model) {
        model.fetch();
      }
    });
  },

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
