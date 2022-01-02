using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        public IEnumerable<Evento> _evento = new Evento[]{
             new Evento(){
                EventoId = 1,
                Tema = "Angular 11 e .NET 5",
                Local = "Belo Horizonte",
                QtdPessoas = 250,
                DataEvento = DateTime.Now.AddDays(2).ToString(),
                ImagemURL = "foto.png"
            },
            new Evento(){
                EventoId = 2,
                Tema = "Angular e suas nov",
                Local = "São Paulo",
                QtdPessoas = 280,
                DataEvento = DateTime.Now.AddDays(3).ToString(),
                ImagemURL = "foto2.png"
            }
        
            };
        
        public EventoController()
        {
      
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _evento;
        }
        [HttpGet("{id}")]
        public IEnumerable<Evento> Get(int id)
        {
            return _evento.Where(evento => evento.EventoId == id);
        }
             [HttpPost]
        public string Post()
        {
            return "Exemplo POST";
        }

               [HttpPut("{id}")]
        public string Put(int id)
        {
            return $"Exemplo Put = {id}" ;
        }

               [HttpDelete("{id}")]
        public string DeHttpDelete(int id)
        {
            return $"Exemplo DeHttpDelete = {id}" ;
        }
    }
}
