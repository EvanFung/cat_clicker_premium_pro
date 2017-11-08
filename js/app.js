$(function() {
    var model = {
        adminShow: false,
        currentCat: null,
        cats: [
            new Cat(0, 'Tabby', 'images/1.jpg'),
            new Cat(0, 'Tiger', 'images/2.jpg'),
            new Cat(0, 'Scaredy', 'images/3.jpg'),
            new Cat(0, 'Evan', 'images/4.jpg'),
            new Cat(0, 'Larry', 'images/5.jpg')
        ]
    };

    var octopus = {
        init: function() {
            model.currentCat = model.cats[0];

            //views initialize
            catListView.init();
            catView.init();
            adminView.init();
        },
        getCats: function() {
            return model.cats;
        },
        setCurrentCat: function(cat) {
            model.currentCat = cat;
        },
        getCurrentCat: function() {
            return model.currentCat;
        },
        incrementCount: function() {
            model.currentCat.clickCount++;
            //render the admin view and cat detail view when update the model value
            catView.render();
            adminView.render();
        },
        toggleAdmin: function() {
            if (!model.adminShow) {
                model.adminShow = true;
                adminView.show();
            } else {
                model.adminShow = false;
                adminView.hide();
            }
            adminView.render();
        },
        saveCat: function() {
            var name = adminView.$catNameElem.val();
            var imgSrc = adminView.$catImageURLElem.val();
            var clickCount = adminView.$countElem.val();

            model.currentCat.name = name;
            model.currentCat.imgSrc = imgSrc;
            model.currentCat.clickCount = clickCount;

            //render the admin view and cat detail view onece update the DOM elements value
            adminView.render();
            catView.render();
            catListView.render();
        },
        cancelCat: function() {
            adminView.hide();
        },
        getCatsNumber: function() {
            return model.cats.length;
        }

    };

    var catView = {
        init: function() {
            // store pointers to our DOM elements for easy access later
            this.$catElem = $('#cat');
            this.$catNameElem = $('#cat-name');
            this.$catImageElem = $('#cat-img');
            this.$countElem = $('#cat-count');

            this.$catImageElem.click(function() {
                octopus.incrementCount();
            });

            this.render();

        },
        render: function() {
            // update the DOM elements with values from the current cat
            var currentCat = model.currentCat;
            this.$catNameElem.text(currentCat.name);
            this.$catImageElem.attr('src', currentCat.imgSrc);
            this.$countElem.text(currentCat.clickCount);
        }
    };

    var catListView = {
        init: function() {
            // store the DOM element for easy access later
            this.$catListElem = $('#cat-list');
            this.catListElem = document.getElementById('cat-list');
            this.render();
        },
        render: function() {
            //update the DOM elements with value from the current cat
            var cats = octopus.getCats();
            
            // empty the cat list
            this.catListElem.innerHTML = '';

            for (var i = 0; i < cats.length; i++) {
                var cat = cats[i];
                var $li = $('<li></li>');
                $li.text(cat.name);

                this.$catListElem.append($li);
                // on click, setCurrentCat and render the catView
                // (this uses our closure-in-a-loop trick to connect the value
                //  of the cat variable to the click event function)                

                $li.click(function(catCopy) {
                    return function() {
                        octopus.setCurrentCat(catCopy);
                        catView.render();
                        adminView.render();
                    }
                }(cat));
            }
        }
    };


    var adminView = {
        init: function() {
            // store pointers to our DOM elements for easy access later
            this.$adminFormElem = $('#admin-form');
            this.$catNameElem = $('#admin-name');
            this.$catImageURLElem = $('#admin-imgSrc');
            this.$countElem = $('#admin-clickCount');
            this.$adminButton = $('#admin-button');
            this.$adminCancel = $('#admin-cancel');
            this.$adminSave = $('#admin-save');
            //hide the admin form at first.
            this.hide();

            this.$adminButton.click(function() {
                octopus.toggleAdmin();
            });

            this.$adminSave.click(function(e) {
                e.preventDefault();
                octopus.saveCat();
            });

            this.$adminCancel.click(function(e) {
                e.preventDefault();
                octopus.cancelCat();
            });

            this.render();
        },
        render: function() {
            //update the DOM elements with value from the current cat
            var currentCat = octopus.getCurrentCat();

            this.$catNameElem.val(currentCat.name);
            this.$catImageURLElem.val(currentCat.imgSrc);
            this.$countElem.val(currentCat.clickCount);
        },
        show: function() {
            //change the form when admin button was toggeled
            this.$adminFormElem.css('display', 'block');
        },
        hide: function() {
            this.$adminFormElem.css('display', 'none');
        }

    };

    // make it go!
    octopus.init();
}());