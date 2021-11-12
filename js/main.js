'use strict';
$(document).ready(function(){

    /****************************************************************************************/
    // グローバル変数宣言
    /****************************************************************************************/

    let gHoldStr  = ""               // 入力文字列の保持用
    let gHoldNum = 0;                // 計算用の数値の保持用
    let gHoldOpe = "";               // 計算用の演算子の保持用
    let gErrFlag = false;            //エラーフラグ true:エラーなし, false:エラー

    /****************************************************************************************/
    // 関数宣言
    /****************************************************************************************/

    // 変数の初期化関数
    const initVar = (initFlag) => {
        gHoldStr = "";
        gHoldOpe ="";

        // "AC"では初期化するが、"="では初期化しない
        if(initFlag) {
            gHoldNum = 0;
            gErrFlag = false;
        }
        else{/* 何もしない */}
    }

    // ボタン活性化関数
    const initDispBtn = () => {
        $(".pls").text(" "); 
        $(".minus").text(" "); 
        $(".mult").text(" "); 
        $(".divide").text(" "); 
        $(".num-btn .btn").prop("disabled", false);
        $(".ope-btn .btn").prop("disabled", false);
        $(".eql-btn .btn").prop("disabled", false);   
    }

    // エラー設定関数
    const errSet = () =>{
        gErrFlag = true;
        $(".calc-disp").text("エラー！"); 
        $(".num-btn .btn").prop("disabled", true);
        $(".ope-btn .btn").prop("disabled", true);
        $(".eql-btn .btn").prop("disabled", true);
    }

    // 四則演算子の表示設定関数
    const dispOpe = (inputOpe) => {
        $(".pls").text(" "); 
        $(".minus").text(" "); 
        $(".pls").text(" "); 
        $(".divide").text(" ");
        switch(inputOpe){
            case "+":
                $(".pls").text("+");             
                break;    
            case "-":
                $(".pls").text("-");             
                break;    
            case "*":
                $(".pls").text("×");             
                break;    
            case "/":
                $(".pls").text("÷");             
                break;    
        }
    }

    // 四則演算の実行体
    const calculate = () => {

        let result = true;

        switch(gHoldOpe){
            case "+":
                gHoldNum += Number(gHoldStr);
                break;
            case "-":
                gHoldNum -= Number(gHoldStr);
                break;
            case "*":
                gHoldNum *= Number(gHoldStr);
                break;
            case "/":
                if(Number(gHoldStr) === 0){
                    // ゼロ除算
                    errSet();
                    result = false;
                }
                else{
                    gHoldNum /= Number(gHoldStr);
                }
                break
        }
        return result;
    }

    // 数値文字列が空の場合の四則演算の実行体
    const calculateEmp = () => {

        switch(gHoldOpe){
            case "+":
                break;
            case "-":
                gHoldNum = gHoldNum * (-1);
                break;
            case "*":
                gHoldNum *= gHoldNum;
                break;
            case "/":
                gHoldNum = 1 / gHoldNum;
                break
        }
    }

    // 画面表示実行体
    const calcDisp = (outPutStr) => {
        // 画面出力
        $(".calc-disp").text(outPutStr); 
    }

    /****************************************************************************************/
    // ボタンクリック処理(数値入力)
    /****************************************************************************************/
    $(".num-btn .btn").click(function(){


        let inputStr = $(this).text();                          //入力文字列を取得
        let outPutStr = "";                                     // 画面出力用の文字列

        if(!gErrFlag){  // エラー状態でない場合
            // "."の重複禁止
            if(inputStr ==="."){
                if (gHoldStr.indexOf(inputStr) !== -1){
                    // すでに"."があったら入力文字列をクリア
                    inputStr = "";
                }
            }
            else{/* 何もしない */}

            if(gHoldStr === "" ){
            // 保持文字列がない場合
                if(inputStr ==="."){
                    // "."が入力されたら0を入れておく
                    gHoldStr = "0";
                }
                else if(inputStr ==="00"){
                    // "00"は"0"に変換
                    inputStr = "0";
                }
                else{/* 何もしない */}
            }
            else if(gHoldStr ==="0"){
            // 保持文字列が"0"の場合
                if(inputStr === "00" || inputStr ==="0"){
                    // 入力文字列が"00", "0"の場合、入力文字列をクリア
                    inputStr = "";
                }
                else{
                    if(inputStr !=="."){
                        // 入力文字列が"."以外なら保持文字列をクリア
                        gHoldStr = "";
                    }
                }

            }
            else{/* 何もしない */}

            // 保持する文字列を更新
            gHoldStr = gHoldStr + inputStr;
            // 画面表示用に文字列を取得
            outPutStr = gHoldStr.toString();
            // 画面表示
            calcDisp(outPutStr);
        }
        else{/* 何もしない */}
    });

    /****************************************************************************************/
    // ボタンクリック処理(四則演算子入力)
    /****************************************************************************************/
    $(".ope-btn .btn").click(function(){

        let inputOpe = $(this).text();              //入力文字列を取得
        let outPutStr = "0";                        // 画面出力用の文字列
        let resut = true;

        if(!gErrFlag){  // エラー状態でない場合
            dispOpe(inputOpe);
            if(gHoldStr !==""){
                if(gHoldOpe !== ""){
                    resut = calculate();
                }
                else{
                    gHoldNum =Number(gHoldStr);
                    outPutStr = gHoldNum.toString();
                }
            }
            else{/* 何もしない */}
            if(resut){
                //保持する演算子を更新
                gHoldOpe = inputOpe;
                //入力文字列をクリア
                gHoldStr = "";
                // 画面表示用に文字列を取得
                outPutStr = gHoldNum.toString();
                // 画面表示
                calcDisp(outPutStr);
            }
            else{/* 何もしない */}
        }
        else{/* 何もしない */}
    });

    /****************************************************************************************/
    // ボタンクリック処理(イコール入力)
    /****************************************************************************************/
    $(".eql-btn .btn").click(function(){

        let outPutStr = 0;                          // 画面出力用の数値
        let resut = true;

        if(!gErrFlag){  // エラー状態でない場合
            if(gHoldStr ===""){
            // 保持文字列が空の場合
                if(gHoldNum !== 0){
                    calculateEmp();
                }
                else{/* 何もしない */}
            }
            else{
            // 保持文字列がある場合
                if(gHoldOpe !== ""){
                    resut =calculate();
                }
                else{
                    gHoldNum =Number(gHoldStr);
                }
            }
            if(resut){  // エラー状態でない場合
                outPutStr = gHoldNum;
                $(".calc-disp").text(outPutStr);
            }
            else{/* 何もしない */}
            
            initVar(false);
            initDispBtn();
        }
        else{/* 何もしない */}
    });

    /****************************************************************************************/
    // ボタンクリック処理(AC入力)
    /****************************************************************************************/
    $(".ac-btn .btn").click(function(){
        initVar(true);
        initDispBtn();
        $(".calc-disp").text(0);
    });

});