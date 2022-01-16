
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Contratos;
using ProEventos.Domain;
using ProEventos.Persitence.Contextos;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {

   
        private readonly IEventoService _eventoService;

        public EventosController(IEventoService eventoService)
        {
            _eventoService = eventoService;
          
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
           try
           {
                var eventos = await _eventoService.GetAllEventosAsync(true);
                if(eventos == null) return NotFound("Nenhum evento encontrado");

                return Ok(eventos);
           }
           catch (Exception ex)
           {
               
               return this.StatusCode(
                   StatusCodes.Status500InternalServerError,
                   $"Erro ao tentar recuperar eventos. Erro: {ex.Message} ");
           }
        }
        [HttpGet("EventoTema/{tema}")]
        public async Task<IActionResult> GetByTema(string tema)
        {
            try
           {
                var evento = await _eventoService.GetAllEventosByTemaAsync(tema, true);
                if(evento == null) return NotFound("Evento por tema não encontrado");

                return Ok(evento);
           }
           catch (Exception ex)
           {
               
               return this.StatusCode(
                   StatusCodes.Status500InternalServerError,
                   $"Erro ao tentar recuperar evento de Tema:{tema}. Erro: {ex.Message} ");
           }
        }
        [HttpGet("EventoId/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
           {
                var evento = await _eventoService.GetEventoByIdAsync(id, true);
                if(evento == null) return NotFound("Evento por Id não encontrado");

                return Ok(evento);
           }
           catch (Exception ex)
           {
               
               return this.StatusCode(
                   StatusCodes.Status500InternalServerError,
                  $"Erro ao tentar alterar o evento de Id:{id} Erro: {ex.Message} ");
           }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Evento model)
        {
            try
           {
                var evento = await _eventoService.AddEventos(model);
                if(evento == null) return BadRequest("Erro ao tentar adicionar evento");

                return Ok(evento);
           }
           catch (Exception ex)
           {
               
               return this.StatusCode(
                   StatusCodes.Status500InternalServerError,
                   $"Erro ao tentar adicionar evento. Erro: {ex.Message} ");
           }
        }

        [HttpPut("EventoUpdate/{id}")]
        public async Task<IActionResult> Put(int id, Evento model)
        {
            try
           {
                var evento = await _eventoService.UpdateEvento(id, model);
                if(evento == null) return BadRequest($"Erro ao tentar alterar evento {id}");

                return Ok(evento);
           }
           catch (Exception ex)
           {
               
               return this.StatusCode(
                   StatusCodes.Status500InternalServerError,
                   $"Erro ao tentar alterar o evento {id} Erro: {ex.Message} ");
           }
        }

        [HttpDelete("DeleteEvento/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
             try
           {
                if(await _eventoService.DeleteEvento(id)){
                    
                return Ok("Deletado");
                } 
                else{

                return BadRequest("Erro ao tentar deletar evento");
                }

           }
           catch (Exception ex)
           {
               
               return this.StatusCode(
                   StatusCodes.Status500InternalServerError,
                   $"Erro ao tentar deletar o evento {id} Erro: {ex.Message} ");
           };
        }
    }
}
