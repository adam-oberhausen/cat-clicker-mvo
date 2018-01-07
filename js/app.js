$(function() {
  var model = {
    currentCat: null,
    cats: [{
        name: "Buttons",
        url: "images/buttons.jpg",
        clickCount: 0,
        id: 0
      },
      {
        name: "Stinky",
        url: "images/stinky.jpg",
        clickCount: 0,
        id: 1
      },
      {
        name: "Yoshi",
        url: "images/yoshi.jpg",
        clickCount: 0,
        id: 2
      },
      {
        name: "Phoenix",
        url: "images/phoenix.jpg",
        clickCount: 0,
        id: 3
      },
      {
        name: "Bubba",
        url: "images/bubba.jpg",
        clickCount: 0,
        id: 4
      },
    ]
  };

  var octopus = {
    init: function() {
      // set our current cat to the first one on the array
      model.currentCat = model.cats[0];

      // tell our view to initialize
      catListView.init();
      catView.init();
      adminView.init();
    },

    getCats: function() {
      return model.cats;
    },

    getCurrentCat: function() {
      return model.currentCat;
    },

    setCurrentCat: function(cat) {
      model.currentCat = cat;
      catView.render();
      adminView.render();
    },

    incrementCounter: function() {
      model.currentCat.clickCount++;
      catView.render(model.currentCat);
    },

    updateCurrentCatValues: function(cat) {
      model.currentCat.name = cat.name;
      model.currentCat.url = cat.url;
      model.currentCat.clickCount = cat.clickCount;

      catListView.init();
      catView.render();
      adminView.render();
    }
  };

  var catView = {
    init: function() {
      this.catElement = $("#cat");
      this.catNameElement = $("#cat-name");
      this.catImageElement = $("#cat-image");
      this.catCountElement = $("#cat-count");

      this.catImageElement.click(function(e) {
        octopus.incrementCounter();
      });

      this.render();
    },

    render: function() {
      var currentCat = octopus.getCurrentCat();
      this.catCountElement.text(currentCat.clickCount);
      this.catNameElement.text(currentCat.name);
      this.catImageElement.attr("src", currentCat.url);
    }
  };

  var catListView = {
    init: function() {
      this.catListElement = $('#list-of-cats');
      this.render();
    },

    render: function() {
      var cats = octopus.getCats();

      this.catListElement.empty();

      for (var i = 0; i < cats.length; i++) {
        var cat = cats[i];

        this.catListElement.append('<li id="list-item-' + cat.id + '"><h4>' + cat.name + '</h4></li>');
        var $listItem = $('#list-item-' + cat.id);
        $listItem.click((function(cat) {
          return function() {          
            octopus.setCurrentCat(cat);
          };
        })(cat));
      }
    }
  };

  var adminView = {
    init: function() {
      this.adminCatName = $("#admin-cat-name");
      this.adminCatUrl = $("#admin-cat-url");
      this.adminCatClicks = $("#admin-cat-clicks");
      this.adminButton = $("#admin-button");
      this.adminButtonCancel = $("#admin-button-cancel");
      this.adminButtonSave = $("#admin-button-save");

      this.adminButtonCancel.click(function(e) {
        $("#admin-button").click();
      });

      this.adminButtonSave.click(function(e) {
        var updatedCat = {
          name: $("#admin-cat-name")[0].value,
          url: $("#admin-cat-url")[0].value,
          clickCount: $("#admin-cat-clicks")[0].value
        };

        octopus.updateCurrentCatValues(updatedCat);
        $("#admin-button").click();
      });

      this.render();
    },

    render: function() {
      var currentCat = octopus.getCurrentCat();
      this.adminCatClicks.text(currentCat.clickCount);
      this.adminCatName.text(currentCat.name);
      this.adminCatUrl.text(currentCat.url);

      this.adminCatClicks[0].value = currentCat.clickCount;
      this.adminCatName[0].value = currentCat.name;
      this.adminCatUrl[0].value = currentCat.url;
    }
  };
  octopus.init();
});
