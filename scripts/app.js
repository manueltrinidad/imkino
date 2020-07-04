class App {
    
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
    
    // Render the footer
    renderFooter() {
        let template = $("#t-footer").html();
        let out = Mustache.render(template, GENERAL_VARIABLES);
        $("body").append(out);
    }
    
    // Site Renders
    
    // Main | Home Site
    renderMain() {
        // Render basics
        this.renderNavbar("main");
        this.renderContainer();
        
        // Render the links
        let template = $("#t-main-links").html();
        let out = Mustache.render(template, MAIN_DATA);
        $(".container").append(out);
        
        // Render the footer
        this.renderFooter();
    }
    
    // About Me Site
    renderAbout() {
        // Render basics
        this.renderNavbar("About Me");
        this.renderContainer();
        
        // Render the main part of the about
        let template = $("#t-about").html();
        let out = Mustache.render(template, {});
        $(".container").append(out);
        
        // Render the footer
        this.renderFooter();
    }
    
    // Journal Site
    renderJournal() {
        // Render basics
        this.renderNavbar("Journal");
        this.renderContainer();
        
        // Render the entries for the journal
        $.get("/data/journal_entries.json", { cache : false },function(data) {
            let template = $("#t-journal-entries").html();
            let out = Mustache.render(template, data);
            $(".container").append(out);
        });
        
        // Render the footer
        this.renderFooter();
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
        }
    }
}