class App {

    // Render App Layout with the site loaded
    renderLayout(site) {
        this.renderContainer();
        this.renderNavbar(site);
        this.renderBadges();
        this.renderFooter();
    }
    
    // General Component Renders
    
    renderContainer() {
        $("<div/>", {
            "class" : "container"
        }).appendTo("body");
    }
    
    // Render the navbar with the site it's being loaded on
    renderNavbar(site) {
        let template = $("#t-navbar").html();
        if(site == "main") {
            site = {};
        } else {
            // Mental Mindfuck
            site = {
                site : site
            }
        }
        let out = Mustache.render(template, site);
        $("body").prepend(out);
    }

    // Render the Badges
    renderBadges() {
        let template = $("#t-badges").html();
        let out = Mustache.render(template, GENERAL_VARIABLES);
        $("body").append(out);
    }
    
    // Render the footer
    renderFooter() {
        let template = $("#t-footer").html();
        let out = Mustache.render(template, GENERAL_VARIABLES);
        $("body").append(out);
    }
    
    // Site Renders
    
    // Main | Home Site
    renderMain() {
        this.renderLayout("main");
        let template = $("#t-main-links").html();
        let out = Mustache.render(template, MAIN_DATA);
        $(".container").append(out);
    }
    
    // About Me Site
    renderAbout() {
        this.renderLayout("About Me");
        // Render the main part of the about
        let template = $("#t-about").html();
        let out = Mustache.render(template, {});
        $(".container").append(out);
    }
    
    // Journal Site
    renderJournal() {
        this.renderLayout("Journal");
        // Render the entries for the journal
        $.get("/data/journal_entries.json", { cache : false }, function(data) {
            let template = $("#t-journal-entries").html();
            let out = Mustache.render(template, data);
            $(".container").append(out);
        });
    }

    // Films Site
    renderFilms() {
        this.renderLayout("Film Reviews");
        // Render the film reviews
        $.get("/data/film_reviews.json", { cache : false }, function(data) {
            let template = $("#t-films-layout").html();

            var directors_array = new Array();
            for (let i = 0; i < data.reviews.length; i++) {
                for (let x = 0; x < data.reviews[i].film.directors.length; x++) {
                    const director = data.reviews[i].film.directors[x];

                    // Check if the director exists in the array
                    if(!directors_array.some(d => d.id == director.id)) {
                        directors_array.push(director);
                    }
                }
            }

            // Sort the directors
            const sortedDirectors = directors_array.sort(function(a, b) {
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1; //nameA comes first
                }
                if (nameA > nameB) {
                  return 1; // nameB comes first
                }
                return 0;  // names must be equal
              });

            data.directors = sortedDirectors;
            let out = Mustache.render(template, data);
            $(".container").append(out);
        });
    }
    
    // Render the site 
    render(site) {
        switch(site) {
            case "main":
            this.renderMain();
            break;
            case "about":
            this.renderAbout();
            break;
            case "journal":
            this.renderJournal();
            break;
            case "films":
            this.renderFilms();
            break;
        }
    }
}