using UnityEngine;

public class ConnectWithUs : MonoBehaviour
{
    // For the email button: clay@emailaddress
    public void OpenEmail()
    {
        string email = "clay@emailaddress.com";
        string subject = MyEscapeURL("KITH App Support");
        Application.OpenURL("mailto:" + email + "?subject=" + subject);
    }

    // For the phone button: clay@phonenumber
    public void OpenDialer()
    {
        string phoneNumber = "123456789"; // Replace with actual
        Application.OpenURL("tel:" + phoneNumber);
    }

    // Helper to format URLs correctly
    string MyEscapeURL(string url)
    {
        return UnityEngine.Networking.UnityWebRequest.EscapeURL(url).Replace("+", "%20");
    }
}