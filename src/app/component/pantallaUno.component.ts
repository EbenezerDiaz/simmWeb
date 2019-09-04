import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/usuario.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorage } from '../security/token.storage';
import { AuthenticationService} from '../security/auth.service';
import * as d3 from 'd3';
import * as topojson from 'topojson';

@Component({
  selector: 'app-pantalla-uno',
  templateUrl: '../views/pantalla1.html',
  styleUrls: ['../styles/pantalla1.css']
})
export class PantallaUnoComponent implements OnInit {
  public name: string = 'd3';
  constructor(
    private token: TokenStorage,
    private jwtHelperService: JwtHelperService
  )
    {
  }
  ngOnInit() {
    

    let width = 735;
    let height = 616;

    let projection = d3.geoMercator()
    .scale(17400)
    .center([-99.272274, 19.5053678]);

    let svg = d3.select('p').append('svg')
      .attr('width', width)
      .attr('height', height);
    let path = d3.geoPath()
      .projection(projection);
    let g = svg.append('g');
    g.attr('class', 'map');


    d3.json("assets/edoMex.topojson")
      .then(function (topology) {
        g.selectAll('path')
          .data(topojson.feature(topology, topology.objects.municipalities).features)
          .enter()
          .append('path')
          .attr('d', path);

      });
  }
}