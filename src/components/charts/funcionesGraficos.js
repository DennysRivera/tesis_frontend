function valoresEnArreglo(lecturas) {
    let arregloValores = [];
    lecturas.forEach((lectura) => {
      arregloValores.push(lectura.lectura_valor);
    });
    return arregloValores;
  }
  
  function tiemposEnArreglo(lecturas) {
    let arregloTiempos = [];
    lecturas.forEach((lectura) => {
      arregloTiempos.push(lectura.createdAt.hora);
    });
    return arregloTiempos;
  }
  
  function promedioValores(lecturas) {
    let promedio = 0;
    let promedioArreglo = [];
    let valores = valoresEnArreglo(lecturas);
    for (let i = 0; i < valores.length; i++) {
      promedio += valores[i];
    }
    promedio = promedio / valores.length;
    for (let i = 0; i < valores.length; i++) {
      promedioArreglo.push(promedio);
    }
    console.log(promedio);
    return promedioArreglo;
  }

  export {
    valoresEnArreglo,
    tiemposEnArreglo,
    promedioValores
  }