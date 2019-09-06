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
  public name = 'd3';
  constructor(
    private token: TokenStorage,
    private jwtHelperService: JwtHelperService
  ) {
  }
  ngOnInit() {
    const width = 735;
    const height = 616;

    const projection = d3.geoMercator()
    .scale(17200)
    .center([-99.272274, 19.5053678]);

    const svg = d3.select('p').append('svg').attr('width', width).attr('height', height);
    const path = d3.geoPath().projection(projection);
    const g = svg.append('g');
    g.attr('class', 'map');
    var tooltip = d3.select('body').append('div')
            .attr('class', 'hidden tooltip');

    d3.json('assets/edoMex.topojson')
      .then(function (topology: any) {
        g.selectAll('path')
          .data(topojson.feature(topology, topology.objects.municipalities).features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', 'white')
          .style('stroke', '#333')
          .style('stroke-width', '.5px')
          .attr('class', 'muns')
          .on('mouseover', function (d: any) {
            d3.select(this).style('fill', 'red')
            .append('svg:title')
            .attr('class', function(e: any) { return 'path ' + e.properties.mun_code; })
            .attr('transform', function(f: any) { return 'translate(' + path.centroid(f) + ')'; })
            .attr('dy', '.35em')
            .text(function(h: any) { return h.properties.mun_name; });

          }).on('mouseout', function() {
            d3.selectAll('path').style('fill', 'white');
          });
      });
  }
}
