angular.module('PokemonCtrl', []).controller('PokemonController', function($scope, $location, $stateParams, Pokemon, $q) {

/*    $scope.pokeId = $routeParams.pokeId;
*/
    $scope.pokeId = $stateParams.id;
    $scope.pokeUrl = 'img/pokemons/pokemon' + $scope.pokeId + '.jpg';
    $scope.moveFilter = 'level up';

    $('.parallax').parallax();
    $('.tabs').tabs();

    Pokemon.getPokemon($scope.pokeId).success(function(poke) {
        if(poke.evolutions.length > 0) {
            poke.evolutions.forEach(function(evo) {
                evo.id = parseInt(evo.resource_uri.replace('/api/v1/pokemon/', ''));
                evo.method = evo.method.replace('_', ' ');

            });
        }

        poke.pict = "http://img.pokemondb.net/artwork/" + poke.name.toLowerCase() + ".jpg";
        poke.total = poke.attack + poke.defense + poke.speed + poke.sp_atk + poke.sp_def + poke.hp;
        poke.percAtk = poke.attack / 255 * 100;
        poke.percSpAtk = poke.sp_atk / 255 * 100;
        poke.percDef = poke.defense / 255 * 100;
        poke.percSpDef = poke.sp_def / 255 * 100;
        poke.percSpeed = poke.speed / 255 * 100;
        poke.percHp = poke.hp / 255 * 100;

        $scope.poke = poke;
        $scope.moves = poke.moves;

        if($scope.pokeId > 1) {
            var _subs = Pokemon.getSubEvo($scope.pokeId);
            _subs.then(function(subs) {
                $scope.subEvos = subs;
                //console.log($scope.subEvos);
            });
        }


        var _overs = Pokemon.getOverEvo($scope.pokeId);
        _overs.then(function(overs) {
            $scope.overEvos = overs;
            //console.log($scope.overEvos);
        });
    });

})
.filter('numberFixedLen', function () {
    return function (n, len) {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);

        if (isNaN(num) || isNaN(len)) {
            return n;
        }

        num = ''+num;

        while (num.length < len) {
            num = '0'+num;
        }

        return num;
    };
});
