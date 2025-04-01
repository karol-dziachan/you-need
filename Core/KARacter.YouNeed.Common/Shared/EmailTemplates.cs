namespace KARacter.YouNeed.Common.Shared;

public static class EmailTemplates
{
    public static string ActivationEmail(string activationLink, string companyName)
    {
        return $@"
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f7fa; border-radius: 10px; border: 1px solid #e1e8ed;'>
            <div style='text-align: center; padding: 20px 0;'>
                <h1 style='color: #2c3e50; margin-bottom: 20px; font-size: 28px; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);'>Witamy w {companyName}! 🎉</h1>
                <p style='color: #34495e; font-size: 16px; line-height: 1.8; margin: 0 20px;'>
                    Cieszymy się, że dołączasz do naszej społeczności! ✨ Jesteśmy przekonani, że razem stworzymy coś wyjątkowego! 🌟
                </p>
            </div>

            <div style='background-color: white; padding: 25px; border-radius: 12px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e1e8ed;'>
                <p style='color: #34495e; font-size: 16px; margin-bottom: 20px; text-align: center;'>
                    Aby rozpocząć swoją przygodę z naszą platformą, aktywuj swoje konto: 🚀
                </p>
                <div style='text-align: center;'>
                    <a href='{activationLink}' style='display: inline-block; background: linear-gradient(45deg, #3498db, #2980b9); color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; transition: transform 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.2);'>
                        ✨ Aktywuj Konto ✨
                    </a>
                </div>
                <p style='color: #7f8c8d; font-size: 14px; text-align: center; background-color: #f8f9fa; padding: 15px; border-radius: 8px;'>
                    Jeśli przycisk nie działa, skopiuj i wklej poniższy link do przeglądarki:<br>
                    <span style='color: #3498db; word-break: break-all; display: block; margin-top: 10px;'>{activationLink}</span>
                </p>
            </div>

            <div style='text-align: center; padding: 20px 0; border-top: 2px dashed #eee; margin-top: 20px;'>
                <p style='color: #7f8c8d; font-size: 15px; margin-bottom: 15px;'>
                    W razie pytań, jesteśmy do Twojej dyspozycji! 💬
                </p>
                <p style='color: #34495e; font-weight: bold; margin-top: 20px;'>
                    Z pozdrowieniami, 👋<br>
                    Zespół {companyName} 🌟
                </p>
            </div>

            <div style='text-align: center; margin-top: 20px; font-size: 12px; color: #95a5a6;'>
                <p>© {DateTime.Now.Year} {companyName}. Wszystkie prawa zastrzeżone. 🔒</p>
            </div>
        </div>";
    }

    public static string DeactivationEmail(string companyName)
    {
        return $@"
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f7fa; border-radius: 10px; border: 1px solid #e1e8ed;'>
            <div style='text-align: center; padding: 20px 0;'>
                <h1 style='color: #2c3e50; margin-bottom: 20px; font-size: 28px; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);'>Dezaktywacja konta w {companyName}</h1>
                <p style='color: #34495e; font-size: 16px; line-height: 1.8; margin: 0 20px;'>
                    Z przykrością informujemy, że Twoje konto zostało dezaktywowane. 
                </p>
            </div>

            <div style='background-color: white; padding: 25px; border-radius: 12px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e1e8ed;'>
                <p style='color: #34495e; font-size: 16px; margin-bottom: 20px; text-align: center;'>
                    Jeśli uważasz, że to pomyłka lub masz jakiekolwiek pytania, skontaktuj się z nami.
                </p>
            </div>

            <div style='text-align: center; padding: 20px 0; border-top: 2px dashed #eee; margin-top: 20px;'>
                <p style='color: #7f8c8d; font-size: 15px; margin-bottom: 15px;'>
                    Dziękujemy za dotychczasową współpracę.
                </p>
                <p style='color: #34495e; font-weight: bold; margin-top: 20px;'>
                    Z poważaniem,<br>
                    Zespół {companyName}
                </p>
            </div>

            <div style='text-align: center; margin-top: 20px; font-size: 12px; color: #95a5a6;'>
                <p>© {DateTime.Now.Year} {companyName}. Wszystkie prawa zastrzeżone. 🔒</p>
            </div>
        </div>";
    }
}
