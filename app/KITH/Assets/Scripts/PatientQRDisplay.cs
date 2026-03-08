using UnityEngine;
using TMPro;
using UnityEngine.UI;

public class PatientQRDisplay : MonoBehaviour
{
    public TextMeshProUGUI patientIDText;
    public RawImage qrCodeImage; // If you use a generated QR texture

    void Start()
    {
        GeneratePatientID();
    }

    void GeneratePatientID()
    {
        // This creates a simple unique ID for the patient
        string uniqueID = "KITH-" + Random.Range(1000, 9999);
        patientIDText.text = "Your ID: " + uniqueID;
        
        // In a real app, you'd use a library to turn this string into a QR image
        Debug.Log("Displaying QR for ID: " + uniqueID);
    }
}
