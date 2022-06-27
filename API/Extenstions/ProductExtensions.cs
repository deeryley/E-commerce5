﻿using System.Collections.Generic;
using System.Linq;

using API.Entities;

namespace API.Extenstions
{
    public static class ProductExtensions
    {

        // sorting items in a-z + sorting a-z when sorted by price 
        public static IQueryable<Product> Sort( this IQueryable<Product> query, string orderBy )
        {
            if ( string.IsNullOrWhiteSpace( orderBy ) ) return query.OrderBy( p => p.Name );

            query = orderBy switch
            {
                "price" => query.OrderBy( p => p.Price ),
                "priceDescending" => query.OrderByDescending( p => p.Price ),
                _ => query.OrderBy( p => p.Name )

            };
            return query;
        }
        // search items by user input 
        public static IQueryable<Product> Search( this IQueryable<Product> query, string input )
        {
            if ( string.IsNullOrEmpty( input ) ) return query;

            var inputToLower = input.Trim().ToLower();

            return query.Where( p => p.Name.ToLower().Contains( inputToLower ) );
        }


        // adding filtering  by brand and by type
        public static IQueryable<Product> Filter( this IQueryable<Product> query, string brands, string types )
        {
            var brandList = new List<string>();
            var typeList = new List<string>();

            if ( !string.IsNullOrEmpty( brands ) )
                brandList.AddRange( brands.ToLower().Split( "," ).ToList() );

            if ( !string.IsNullOrEmpty( types ) )
                typeList.AddRange( types.ToLower().Split( "," ).ToList() );

            query = query.Where( p => brandList.Count == 0 || brandList.Contains( p.Brand.ToLower() ) );
            query = query.Where( p => typeList.Count == 0 || typeList.Contains( p.Type.ToLower() ) );

            return query;

        }
    }
}