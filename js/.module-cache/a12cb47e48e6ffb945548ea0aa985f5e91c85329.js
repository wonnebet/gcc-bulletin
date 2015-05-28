

$(function() {
    var firebaseRootConnStr = "https://crackling-torch-3976.firebaseio.com/gcc/";
    var basesDir = "bases/";
    var clanCastlesDir = "clanCastleConfigurations/";
    var unitsDir = "units/";

    var basesRef = new Firebase(firebaseRootConnStr + basesDir);

    basesRef.orderByChild("attackOrder").on("value", function(data) {
        $("#basesDiv").empty();

        data.forEach(function(base) {
            addBase(base.key(), base.val());
        });

        updateTotal();
    });

    function addBase(name, base) {
        constructBaseElements(name, base)

        var configurationRef = new Firebase(firebaseRootConnStr + clanCastlesDir + base.clanCastleConfiguration);

        configurationRef.on("value", function(data) {
            updateClanCastle(name, data.val());
        });
    }

    function constructBaseElements(name, base, clanCastle) {
        var $baseDiv = $("<div />");

        $("<input />", {
            type: "checkbox",
            id: name + "_in"
        }).data("base", name).prop("checked", base.in).appendTo($baseDiv).on("click", checkbox_onClick);

        $("<label />", {
            for: name + "_in",
            text: name
        }).appendTo($baseDiv);

        $baseDiv.appendTo("#basesDiv");
    }

    function updateClanCastle(name, clanCastle) {
        $label = $("label[for='"+ name +"_in']");

        $label.text($label.text() + " - " + clanCastle.capacity);
    }

    function checkbox_onClick() {
        var $that = $(this);
        var key = $that.data("base");

        basesRef.child(key).update({in: $that.prop("checked")});

        updateTotal();
    }

    function updateTotal() {
        var numChecked = $("input[type='checkbox']:checked").length;
        var $totalSection = $("#total");

        $totalSection.text(numChecked);
        if (numChecked === 15) {
            $totalSection.prop("class", "perfectWar");
        } else if (numChecked % 5 === 0) {
            $totalSection.prop("class", "acceptableWar");
        } else {
            $totalSection.prop("class", "cannotWar");
        }
    }
});
