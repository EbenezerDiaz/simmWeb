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
    const height = 630;
    const escalaInicial = 17200;
    const posicionInicialX = -99.272274;
    const posicionInicialy = 19.5053678;
    const aspect = width / height;
    const targetWidth = document.getElementById('mapContainer').offsetWidth;
    const chart: any = d3.select('#mapContainer').append('svg')
    .attr('viewBox', '0 0 ' + targetWidth + ' ' + targetWidth / aspect  )
    .attr('preserveAspectRatio', 'xMidYMid');
    
    chart.attr('width', targetWidth);
    chart.attr('height', targetWidth / aspect);
    const escalaNueva = (targetWidth * escalaInicial) / width;
    const posicionx = posicionInicialX;
    const posiciony = posicionInicialy;
    console.log('escalaNueva: ' + escalaNueva / escalaInicial + '%');
    const projection = d3.geoMercator() .scale(escalaNueva) .center([posicionx, posiciony]);
    projection.translate([(width*(escalaNueva / escalaInicial)+180)/2, (height*(escalaNueva / escalaInicial)-90)/2 ]);



    // tslint:disable-next-line: comment-format
    //const projection = d3.geoMercator() .scale(escalaInicial) .center([-99.272274, 19.5053678]);
    const svg = chart;
    const path = d3.geoPath().projection(projection);



    const g = svg.append('g');
    g.attr('class', 'map');

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
